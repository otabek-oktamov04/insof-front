import { useState, useRef } from 'react'
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
  Eye,
  Upload,
  Play,
  Pause,
  Volume2
} from 'lucide-react'
import type { 
  AutoCallTemplate, 
  AutoCallTemplateType
} from '@/data/mockAutoCallTemplates'
import { 
  autoCallTemplateTypes, 
  mockAutoCallTemplates 
} from '@/data/mockAutoCallTemplates'
import { cn } from '@/lib/utils'

export default function AutoCallTemplates() {
  const [templates, setTemplates] = useState<AutoCallTemplate[]>(mockAutoCallTemplates)
  const [selectedType, setSelectedType] = useState<AutoCallTemplateType | 'all'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})
  const [formData, setFormData] = useState<Partial<AutoCallTemplate>>({
    name: '',
    type: 'custom',
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
      isActive: true
    })
  }

  const handleEdit = (template: AutoCallTemplate) => {
    setIsAdding(false)
    setEditingId(template.id)
    setFormData({
      name: template.name,
      type: template.type,
      audioUrl: template.audioUrl,
      duration: template.duration,
      isActive: template.isActive
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      name: '',
      type: 'custom',
      isActive: true
    })
  }

  const handleSave = () => {
    if (!formData.name) {
      return
    }

    if (isAdding) {
      // Add new template
      const newTemplate: AutoCallTemplate = {
        id: Date.now().toString(),
        name: formData.name!,
        type: formData.type || 'custom',
        audioUrl: formData.audioUrl,
        duration: formData.duration,
        variables: autoCallTemplateTypes[formData.type || 'custom'].defaultVariables,
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
              audioUrl: formData.audioUrl,
              duration: formData.duration,
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
      // Stop audio if playing
      if (audioRefs.current[id]) {
        audioRefs.current[id].pause()
        audioRefs.current[id].currentTime = 0
      }
      setTemplates(templates.filter(t => t.id !== id))
    }
  }

  const handleToggleActive = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive, updatedAt: new Date().toISOString() } : t
    ))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In real app, upload to server and get URL
      const url = URL.createObjectURL(file)
      const audio = new Audio(url)
      audio.onloadedmetadata = () => {
        setFormData({
          ...formData,
          audioUrl: url,
          duration: Math.round(audio.duration)
        })
      }
    }
  }

  const handlePlay = (template: AutoCallTemplate) => {
    if (!template.audioUrl) return

    // Stop other playing audio
    Object.values(audioRefs.current).forEach(audio => {
      if (!audio.paused) {
        audio.pause()
        audio.currentTime = 0
      }
    })

    // Get or create audio element
    let audio = audioRefs.current[template.id]
    if (!audio) {
      audio = new Audio(template.audioUrl)
      audioRefs.current[template.id] = audio
      audio.onended = () => setPlayingId(null)
    }

    if (playingId === template.id) {
      audio.pause()
      audio.currentTime = 0
      setPlayingId(null)
    } else {
      audio.play()
      setPlayingId(template.id)
    }
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Avtozvon Audio Shablonlari</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Audio shablonlarini boshqarish va tahrirlash
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
            {(Object.keys(autoCallTemplateTypes) as AutoCallTemplateType[]).map((type) => {
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
                  {autoCallTemplateTypes[type].label} ({count})
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
            <CardTitle>{isAdding ? 'Yangi audio shablon qo\'shish' : 'Audio shablonni tahrirlash'}</CardTitle>
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
                  const newType = e.target.value as AutoCallTemplateType
                  setFormData({ 
                    ...formData, 
                    type: newType
                  })
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium border border-border bg-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors w-full"
              >
                {(Object.keys(autoCallTemplateTypes) as AutoCallTemplateType[]).map((type) => (
                  <option key={type} value={type}>
                    {autoCallTemplateTypes[type].label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                {autoCallTemplateTypes[formData.type || 'custom'].description}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audio-upload">Audio fayl</Label>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="audio-upload"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Fayl yuklash</span>
                </label>
                <input
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {formData.audioUrl && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Volume2 className="w-4 h-4" />
                    <span>Yuklangan</span>
                    {formData.duration && (
                      <span className="text-xs">({formatDuration(formData.duration)})</span>
                    )}
                  </div>
                )}
              </div>
              {formData.audioUrl && (
                <audio
                  src={formData.audioUrl}
                  controls
                  className="w-full mt-2"
                />
              )}
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
                disabled={!formData.name || !formData.audioUrl}
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
                          {autoCallTemplateTypes[template.type].label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {template.audioUrl && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handlePlay(template)}
                        title={playingId === template.id ? 'To\'xtatish' : 'Ijro etish'}
                        className="hover:bg-primary/10"
                      >
                        {playingId === template.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    )}
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
                  {previewId === template.id && template.audioUrl ? (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Audio fayl:</span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setPreviewId(null)}
                          className="h-6 w-6"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <audio
                        src={template.audioUrl}
                        controls
                        className="w-full"
                        ref={(el) => {
                          if (el) audioRefs.current[template.id] = el
                        }}
                      />
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Volume2 className="w-4 h-4" />
                        <span>Audio fayl yuklangan</span>
                        {template.duration && (
                          <span className="text-xs">• {formatDuration(template.duration)}</span>
                        )}
                      </div>
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
