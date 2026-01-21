import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  FileText, 
  Power,
  PowerOff,
  Copy,
  Eye
} from 'lucide-react'
import type { 
  SMSTemplate, 
  TemplateType
} from '@/data/mockTemplates'
import { 
  templateTypes, 
  mockTemplates 
} from '@/data/mockTemplates'
import { cn } from '@/lib/utils'

export default function SMSTemplates() {
  const [templates, setTemplates] = useState<SMSTemplate[]>(mockTemplates)
  const [selectedType, setSelectedType] = useState<TemplateType | 'all'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<SMSTemplate>>({
    name: '',
    type: 'custom',
    content: '',
    isActive: true
  })

  const filteredTemplates = selectedType === 'all' 
    ? templates 
    : templates.filter(t => t.type === selectedType)

  const handleAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({
      name: '',
      type: 'custom',
      content: '',
      isActive: true
    })
  }

  const handleEdit = (template: SMSTemplate) => {
    setIsAdding(false)
    setEditingId(template.id)
    setFormData({
      name: template.name,
      type: template.type,
      content: template.content,
      isActive: template.isActive
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      name: '',
      type: 'custom',
      content: '',
      isActive: true
    })
  }

  const handleSave = () => {
    if (!formData.name || !formData.content) {
      return
    }

    if (isAdding) {
      // Add new template
      const newTemplate: SMSTemplate = {
        id: Date.now().toString(),
        name: formData.name!,
        type: formData.type || 'custom',
        content: formData.content!,
        variables: templateTypes[formData.type || 'custom'].defaultVariables,
        isActive: formData.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setTemplates([...templates, newTemplate])
      setIsAdding(false)
    } else if (editingId) {
      // Update existing template
      setTemplates(templates.map(t => 
        t.id === editingId 
          ? {
              ...t,
              name: formData.name!,
              type: formData.type || 'custom',
              content: formData.content!,
              isActive: formData.isActive ?? true,
              updatedAt: new Date().toISOString()
            }
          : t
      ))
      setEditingId(null)
    }

    handleCancel()
  }

  const handleDelete = (id: string) => {
    if (confirm('Bu shablonni o\'chirishni xohlaysizmi?')) {
      setTemplates(templates.filter(t => t.id !== id))
    }
  }

  const handleToggleActive = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive, updatedAt: new Date().toISOString() } : t
    ))
  }

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById('template-content') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = formData.content || ''
      const newText = text.substring(0, start) + variable + text.substring(end)
      setFormData({
        ...formData,
        content: newText
      })
      // Set cursor position after inserted variable
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + variable.length, start + variable.length)
      }, 0)
    } else {
      setFormData({
        ...formData,
        content: (formData.content || '') + variable
      })
    }
  }

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  const getAvailableVariables = (type: TemplateType) => {
    return templateTypes[type]?.defaultVariables || []
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">SMS Shablonlari</h1>
          <p className="text-sm text-muted-foreground mt-1">
            SMS shablonlarini boshqarish va tahrirlash
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Yangi shablon
        </Button>
      </div>

      {/* Type Filter */}
      <Card className="banking-card">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                selectedType === 'all'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              Barchasi ({templates.length})
            </button>
            {(Object.keys(templateTypes) as TemplateType[]).map((type) => {
              const count = templates.filter(t => t.type === type).length
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedType === type
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {templateTypes[type].label} ({count})
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Card className="banking-card border-primary/20">
          <CardHeader>
            <CardTitle>{isAdding ? 'Yangi shablon qo\'shish' : 'Shablonni tahrirlash'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Shablon nomi</Label>
              <Input
                id="template-name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masalan: To'lov eslatmasi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-type">Shablon turi</Label>
              <select
                id="template-type"
                value={formData.type || 'custom'}
                onChange={(e) => {
                  const newType = e.target.value as TemplateType
                  setFormData({ 
                    ...formData, 
                    type: newType,
                    content: formData.content || ''
                  })
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium border border-border bg-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors w-full"
              >
                {(Object.keys(templateTypes) as TemplateType[]).map((type) => (
                  <option key={type} value={type}>
                    {templateTypes[type].label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                {templateTypes[formData.type || 'custom'].description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="template-content">Shablon matni</Label>
                {formData.content && (
                  <span className="text-xs text-muted-foreground">
                    {formData.content.length} belgi
                  </span>
                )}
              </div>
              <textarea
                id="template-content"
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Shablon matnini kiriting..."
                rows={5}
                className="w-full px-3 py-2 rounded-lg text-sm border border-border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors resize-none font-mono"
              />
              <div className="flex flex-wrap items-center gap-2 p-2 bg-muted/20 rounded-lg">
                <span className="text-xs font-medium text-muted-foreground">O'zgaruvchilarni qo'shish:</span>
                {getAvailableVariables(formData.type || 'custom').map((variable) => (
                  <button
                    key={variable}
                    type="button"
                    onClick={() => insertVariable(variable)}
                    className="px-2.5 py-1 text-xs font-mono bg-background hover:bg-primary/10 border border-border rounded transition-colors hover:border-primary"
                  >
                    {variable}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Label htmlFor="template-active" className="cursor-pointer font-medium">
                  Shablon holati
                </Label>
                <span className={cn(
                  'text-xs px-2 py-1 rounded',
                  formData.isActive 
                    ? 'bg-success-100 text-success-700' 
                    : 'bg-muted text-muted-foreground'
                )}>
                  {formData.isActive ? 'Faol' : 'Nofaol'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  formData.isActive ? 'bg-success-500' : 'bg-muted'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    formData.isActive ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button 
                onClick={handleSave} 
                className="gap-2"
                disabled={!formData.name || !formData.content}
              >
                <Save className="w-4 h-4" />
                Saqlash
              </Button>
              <Button onClick={handleCancel} variant="outline" className="gap-2">
                <X className="w-4 h-4" />
                Bekor qilish
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates List */}
      <div className="space-y-4">
        {filteredTemplates.length === 0 ? (
          <Card className="banking-card">
            <CardContent className="pt-6">
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Shablonlar topilmadi</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={cn(
                'banking-card transition-all',
                !template.isActive && 'opacity-75 border-dashed',
                editingId === template.id && 'ring-2 ring-primary'
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        {/* Enable/Disable Toggle */}
                        <button
                          onClick={() => handleToggleActive(template.id)}
                          className={cn(
                            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                            template.isActive
                              ? 'bg-success-100 text-success-700 hover:bg-success-200'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          )}
                          title={template.isActive ? 'Nofaol qilish' : 'Faollashtirish'}
                        >
                          {template.isActive ? (
                            <>
                              <Power className="w-4 h-4" />
                              <span>Faol</span>
                            </>
                          ) : (
                            <>
                              <PowerOff className="w-4 h-4" />
                              <span>Nofaol</span>
                            </>
                          )}
                        </button>
                        <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                          {templateTypes[template.type].label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleCopyContent(template.content)}
                      title="Matnni nusxalash"
                      className="hover:bg-primary/10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setPreviewId(previewId === template.id ? null : template.id)}
                      title="Ko'rish"
                      className="hover:bg-primary/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleEdit(template)}
                      title="Tahrirlash"
                      className="hover:bg-primary/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(template.id)}
                      title="O'chirish"
                      className="text-error-600 hover:text-error-700 hover:bg-error-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {previewId === template.id ? (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Shablon matni:</span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setPreviewId(null)}
                          className="h-6 w-6"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{template.content}</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.content}
                      </p>
                    </div>
                  )}
                  
                  {template.variables && template.variables.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 p-2 bg-muted/20 rounded-lg">
                      <span className="text-xs font-medium text-muted-foreground">O'zgaruvchilar:</span>
                      {template.variables.map((variable) => (
                        <code
                          key={variable}
                          className="px-2 py-1 text-xs font-mono bg-background border border-border rounded text-primary"
                        >
                          {variable}
                        </code>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                    <span>
                      Oxirgi o'zgarish: {new Date(template.updatedAt).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-xs">
                      {template.content.length} belgi
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
