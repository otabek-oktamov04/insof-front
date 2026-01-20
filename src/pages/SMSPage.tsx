import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BarChart3, List, FileText } from 'lucide-react'
import SMSList from '@/components/SMSList'
import SMSReports from '@/components/SMSReports'
import SMSTemplates from '@/components/SMSTemplates'
import { mockSMSList } from '@/data/mockSMS'

export default function SMSPage() {
  const [activeTab, setActiveTab] = useState('sms-list')

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
                <TabsTrigger value="sms-list">
                  <List className="w-4 h-4 mr-2" />
                  SMS ro'yxati
                </TabsTrigger>
                <TabsTrigger value="templates">
                  <FileText className="w-4 h-4 mr-2" />
                  SMS shablonlari
                </TabsTrigger>
              </TabsList>

              {/* Reporting Tab */}
              <TabsContent value="reporting" className="mt-6">
                <SMSReports />
              </TabsContent>

              {/* SMS List Tab */}
              <TabsContent value="sms-list" className="mt-6">
                <SMSList smsList={mockSMSList} />
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="mt-6">
                <SMSTemplates />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
