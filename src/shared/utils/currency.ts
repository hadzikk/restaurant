/**
 * Format angka ke dalam format Rupiah
 * @param amount - Jumlah uang yang akan diformat
 * @param withSymbol - Menampilkan simbol Rp (default: true)
 * @returns String yang sudah diformat dalam Rupiah
 */
export const toRupiah = (amount: number, withSymbol: boolean = true): string => {
  // Format angka dengan pemisah ribuan
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)

  // Tambahkan simbol Rp jika withSymbol true
  return withSymbol ? `Rp. ${formatted}` : formatted
}