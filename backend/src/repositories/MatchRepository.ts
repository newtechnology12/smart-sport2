import { Repository, Between } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Match, MatchStatus } from '../entities/Match';

export class MatchRepository {
  private repository: Repository<Match>;

  constructor() {
    this.repository = AppDataSource.getRepository(Match);
  }

  async findUpcomingMatches(limit: number = 10): Promise<Match[]> {
    return this.repository.find({
      where: {
        match_date: Between(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
        status: MatchStatus.SCHEDULED,
      },
      relations: ['home_team', 'away_team', 'venue', 'league'],
      order: { match_date: 'ASC' },
      take: limit,
    });
  }

  async findMatchesBySport(sportId: string): Promise<Match[]> {
    return this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.league', 'league')
      .leftJoinAndSelect('match.home_team', 'home_team')
      .leftJoinAndSelect('match.away_team', 'away_team')
      .leftJoinAndSelect('match.venue', 'venue')
      .where('league.sport_id = :sportId', { sportId })
      .andWhere('match.status = :status', { status: MatchStatus.SCHEDULED })
      .orderBy('match.match_date', 'ASC')
      .getMany();
  }

  async findMatchesByLeague(leagueId: string): Promise<Match[]> {
    return this.repository.find({
      where: { league_id: leagueId },
      relations: ['home_team', 'away_team', 'venue'],
      order: { match_date: 'ASC' },
    });
  }

  async findMatchesWithAvailableTickets(): Promise<Match[]> {
    return this.repository
      .createQueryBuilder('match')
      .where('match.tickets_available = :available', { available: true })
      .andWhere('match.tickets_sold < match.max_tickets')
      .andWhere('match.status = :status', { status: MatchStatus.SCHEDULED })
      .andWhere('match.match_date > :now', { now: new Date() })
      .leftJoinAndSelect('match.home_team', 'home_team')
      .leftJoinAndSelect('match.away_team', 'away_team')
      .leftJoinAndSelect('match.venue', 'venue')
      .leftJoinAndSelect('match.league', 'league')
      .orderBy('match.match_date', 'ASC')
      .getMany();
  }

  async updateTicketsSold(matchId: string): Promise<void> {
    await this.repository.increment({ id: matchId }, 'tickets_sold', 1);
  }
}