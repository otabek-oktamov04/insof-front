import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BarChart3, FileText, List } from 'lucide-react'
import AutoCallReports from '@/components/AutoCallReports'
import AutoCallTemplates from '@/components/AutoCallTemplates'
import CallsList from '@/components/CallsList'
import { mockCallsList } from '@/data/mockCalls'

export default function AutoCallPage() {
  const [activeTab, setActiveTab] = useState('calls-list')

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
                <TabsTrigger value="calls-list">
                  <List className="w-4 h-4 mr-2" />
                  Qo'ng'iroqlar ro'yxati
                </TabsTrigger>
                <TabsTrigger value="templates">
                  <FileText className="w-4 h-4 mr-2" />
                  Audio shablonlari
                </TabsTrigger>
              </TabsList>

              {/* Reporting Tab */}
              <TabsContent value="reporting" className="mt-6">
                <AutoCallReports />
              </TabsContent>

              {/* Calls List Tab */}
              <TabsContent value="calls-list" className="mt-6">
                <CallsList callsList={mockCallsList} />
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="mt-6">
                <AutoCallTemplates />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
