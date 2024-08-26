import * as XLSX from 'xlsx'
export function exportExcel (filename, data) {
  let exc = XLSX.utils.book_new();
  let exc_data = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(exc, exc_data, filename);
  XLSX.writeFile(exc, filename + '.xlsx');
}

