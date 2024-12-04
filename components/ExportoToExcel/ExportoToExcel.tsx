'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import * as XLSX from 'xlsx'

interface ExportData {
  [key: string]: any
}

interface ExportToExcelProps {
  data: ExportData[]
  fileName: string
  sheetName: string
}

export const ExportToExcel: React.FC<ExportToExcelProps> = ({
  data,
  fileName,
  sheetName
}) => {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)

    try {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(data)

      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
      XLSX.writeFile(workbook, `${fileName}.xlsx`)
      console.log(`Exported data to ${fileName}.xlsx`)
    } catch (error) {
      console.error('Error exporting to Excel:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={loading}>
      <Download className="mr-2" />
      {loading ? 'Descargando...' : 'Exportar'}
    </Button>
  )
}
