import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BarChart3, List, FileText } from 'lucide-react'
import MailReports from '@/components/MailReports'
import MailList from '@/components/MailList'
import MailTemplates from '@/components/MailTemplates'
import { mockMailList } from '@/data/mockMail'

export default function MailPage() {
  const [activeTab, setActiveTab] = useState('mail-list')

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Tabs at the top */}
        <Card className="banking-card mb-6">
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reporting">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Hisobotlar
                </TabsTrigger>
                <TabsTrigger value="mail-list">
                  <List className="w-4 h-4 mr-2" />
                  Xatlar ro'yxati
                </TabsTrigger>
                <TabsTrigger value="templates">
                  <FileText className="w-4 h-4 mr-2" />
                  Xat shablonlari
                </TabsTrigger>
              </TabsList>

              {/* Reporting Tab */}
              <TabsContent value="reporting" className="mt-6">
                <MailReports />
              </TabsContent>

              {/* Mail List Tab */}
              <TabsContent value="mail-list" className="mt-6">
                <MailList mailList={mockMailList} />
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="mt-6">
                <MailTemplates />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
