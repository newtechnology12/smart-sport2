"use client"

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import {
  Tag,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Settings,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  MoreHorizontal,
  X,
  Save,
  AlertCircle
} from 'lucide-react'

function AdminEventCategories() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [isFormSliding, setIsFormSliding] = useState(false)
  const [isEditFormSliding, setIsEditFormSliding] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    icon: '🏆',
    isActive: true,
    sortOrder: 0,
    parentCategory: '',
    settings: {
      allowSubcategories: true,
      requireApproval: false,
      maxEventsPerCategory: 100,
      allowCustomPricing: true
    }
  })

  // Mock categories data
  const categories = [
    {
      id: 1,
      name: 'Football',
      description: 'Football matches and tournaments',
      color: '#10B981',
      icon: '⚽',
      isActive: true,
      sortOrder: 1,
      parentCategory: null,
      eventCount: 45,
      totalRevenue: 2500000,
      lastUpdated: '2024-03-15',
      settings: {
        allowSubcategories: true,
        requireApproval: false,
        maxEventsPerCategory: 100,
        allowCustomPricing: true
      }
    },
    {
      id: 2,
      name: 'Basketball',
      description: 'Basketball games and competitions',
      color: '#F59E0B',
      icon: '🏀',
      isActive: true,
      sortOrder: 2,
      parentCategory: null,
      eventCount: 23,
      totalRevenue: 1200000,
      lastUpdated: '2024-03-14',
      settings: {
        allowSubcategories: true,
        requireApproval: false,
        maxEventsPerCategory: 50,
        allowCustomPricing: true
      }
    },
    {
      id: 3,
      name: 'Volleyball',
      description: 'Volleyball matches and tournaments',
      color: '#3B82F6',
      icon: '🏐',
      isActive: true,
      sortOrder: 3,
      parentCategory: null,
      eventCount: 18,
      totalRevenue: 800000,
      lastUpdated: '2024-03-13',
      settings: {
        allowSubcategories: false,
        requireApproval: true,
        maxEventsPerCategory: 30,
        allowCustomPricing: false
      }
    },
    {
      id: 4,
      name: 'Tennis',
      description: 'Tennis tournaments and matches',
      color: '#8B5CF6',
      icon: '🎾',
      isActive: true,
      sortOrder: 4,
      parentCategory: null,
      eventCount: 12,
      totalRevenue: 600000,
      lastUpdated: '2024-03-12',
      settings: {
        allowSubcategories: true,
        requireApproval: false,
        maxEventsPerCategory: 25,
        allowCustomPricing: true
      }
    },
    {
      id: 5,
      name: 'Rugby',
      description: 'Rugby matches and competitions',
      color: '#EF4444',
      icon: '🏉',
      isActive: false,
      sortOrder: 5,
      parentCategory: null,
      eventCount: 8,
      totalRevenue: 400000,
      lastUpdated: '2024-03-10',
      settings: {
        allowSubcategories: false,
        requireApproval: true,
        maxEventsPerCategory: 20,
        allowCustomPricing: true
      }
    },
    {
      id: 6,
      name: 'Youth Football',
      description: 'Youth and junior football events',
      color: '#10B981',
      icon: '⚽',
      isActive: true,
      sortOrder: 6,
      parentCategory: 'Football',
      eventCount: 15,
      totalRevenue: 300000,
      lastUpdated: '2024-03-11',
      settings: {
        allowSubcategories: false,
        requireApproval: true,
        maxEventsPerCategory: 40,
        allowCustomPricing: false
      }
    }
  ]

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && category.isActive) ||
                         (statusFilter === 'inactive' && !category.isActive)
    
    return matchesSearch && matchesStatus
  })

  const activeCategories = categories.filter(cat => cat.isActive)
  const totalEvents = categories.reduce((sum, cat) => sum + cat.eventCount, 0)
  const totalRevenue = categories.reduce((sum, cat) => sum + cat.totalRevenue, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: checked
      }
    }))
  }

  const handleCreateCategory = () => {
    console.log('Creating category:', formData)
    // Start closing animation
    setIsFormSliding(false)
    // Close dialog after animation completes
    setTimeout(() => {
      setIsCreateDialogOpen(false)
      // Reset form
      setFormData({
        name: '',
        description: '',
        color: '#3B82F6',
        icon: '🏆',
        isActive: true,
        sortOrder: 0,
        parentCategory: '',
        settings: {
          allowSubcategories: true,
          requireApproval: false,
          maxEventsPerCategory: 100,
          allowCustomPricing: true
        }
      })
    }, 500)
  }

  const openCreateDialog = () => {
    setIsCreateDialogOpen(true)
    // Start animation immediately when dialog opens
    setTimeout(() => setIsFormSliding(true), 10)
  }

  const closeCreateDialog = () => {
    setIsFormSliding(false)
    // Close dialog after animation completes
    setTimeout(() => setIsCreateDialogOpen(false), 500)
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
      isActive: category.isActive,
      sortOrder: category.sortOrder,
      parentCategory: category.parentCategory || '',
      settings: category.settings
    })
    setIsEditDialogOpen(true)
    // Start animation immediately when dialog opens
    setTimeout(() => setIsEditFormSliding(true), 10)
  }

  const closeEditDialog = () => {
    setIsEditFormSliding(false)
    // Close dialog after animation completes
    setTimeout(() => {
      setIsEditDialogOpen(false)
      setEditingCategory(null)
    }, 500)
  }

  const handleUpdateCategory = () => {
    console.log('Updating category:', editingCategory?.id, formData)
    setIsEditFormSliding(false)
    setTimeout(() => {
      setIsEditDialogOpen(false)
      setEditingCategory(null)
    }, 500)
  }

  const handleDeleteCategory = (categoryId: number) => {
    console.log('Deleting category:', categoryId)
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? 
      <Badge className="bg-green-100 text-green-800">Active</Badge> : 
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold apple-title mb-2">Event Categories</h1>
            <p className="text-muted-foreground apple-body">
              Manage event categories and their settings
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="apple-button">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
          if (!open) closeCreateDialog()
        }}>
              <DialogTrigger asChild>
                <Button className="apple-button" onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              </DialogTrigger>
              <DialogContent className={`max-w-2xl transition-all duration-500 ease-in-out ${
                isFormSliding ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}>
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                    Add a new event category to organize your events
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Category Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Football"
                        className="apple-focus"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon</Label>
                      <Input
                        id="icon"
                        name="icon"
                        value={formData.icon}
                        onChange={handleInputChange}
                        placeholder="🏆"
                        className="apple-focus"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe this category..."
                      className="apple-focus"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="color"
                          name="color"
                          type="color"
                          value={formData.color}
                          onChange={handleInputChange}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={formData.color}
                          onChange={handleInputChange}
                          className="apple-focus"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sortOrder">Sort Order</Label>
                      <Input
                        id="sortOrder"
                        name="sortOrder"
                        type="number"
                        value={formData.sortOrder}
                        onChange={handleInputChange}
                        className="apple-focus"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Category Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Subcategories</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow this category to have subcategories
                          </p>
                        </div>
                        <Switch
                          checked={formData.settings.allowSubcategories}
                          onCheckedChange={(checked) => handleSwitchChange('allowSubcategories', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Require Approval</Label>
                          <p className="text-sm text-muted-foreground">
                            Events in this category require admin approval
                          </p>
                        </div>
                        <Switch
                          checked={formData.settings.requireApproval}
                          onCheckedChange={(checked) => handleSwitchChange('requireApproval', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Custom Pricing</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow custom pricing for events in this category
                          </p>
                        </div>
                        <Switch
                          checked={formData.settings.allowCustomPricing}
                          onCheckedChange={(checked) => handleSwitchChange('allowCustomPricing', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={closeCreateDialog}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateCategory} className="apple-button">
                    <Save className="h-4 w-4 mr-2" />
                    Create Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Categories</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
                <Tag className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Categories</p>
                  <p className="text-2xl font-bold">{activeCategories.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold">{totalEvents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M RWF</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle className="apple-subtitle flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 apple-focus"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                className="apple-button"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
            <CardDescription>
              Manage and organize your event categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          {category.parentCategory && (
                            <div className="text-sm text-muted-foreground">
                              Subcategory of {category.parentCategory}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {category.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{category.eventCount}</div>
                        <div className="text-xs text-muted-foreground">events</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        <div className="font-medium">{(category.totalRevenue / 1000).toFixed(0)}K RWF</div>
                        <div className="text-xs text-muted-foreground">total</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(category.isActive)}</TableCell>
                    <TableCell>{category.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
          if (!open) closeEditDialog()
        }}>
          <DialogContent className={`max-w-2xl transition-all duration-500 ease-in-out ${
            isEditFormSliding ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the category information and settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Category Name *</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="apple-focus"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-icon">Icon</Label>
                  <Input
                    id="edit-icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="apple-focus"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="apple-focus"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-color">Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="edit-color"
                      name="color"
                      type="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={formData.color}
                      onChange={handleInputChange}
                      className="apple-focus"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-sortOrder">Sort Order</Label>
                  <Input
                    id="edit-sortOrder"
                    name="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={handleInputChange}
                    className="apple-focus"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeEditDialog}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCategory} className="apple-button">
                <Save className="h-4 w-4 mr-2" />
                Update Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AdminEventCategories, ['admin'])
