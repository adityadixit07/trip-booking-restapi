import PDFDocument from 'pdfkit';

export function streamTicketPdf(res, booking, trip, user) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=ticket_${booking._id}.pdf`);
  doc.pipe(res);

  doc.fontSize(20).text('Trip Ticket', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Booking ID: ${booking._id}`);
  doc.text(`Name: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Trip: ${trip.from} -> ${trip.to}`);
  doc.text(`Date: ${new Date(trip.date).toDateString()}`);
  if (trip.time) doc.text(`Time: ${trip.time}`);
  doc.text(`Seats: ${booking.seats.map(s => s.seatNumber).join(', ')}`);
  doc.text(`Total: ₹${booking.totalAmount}`);
  doc.text(`Status: ${booking.status}`);
  doc.moveDown();

  doc.text('Thank you for booking trip with our Company', { align: 'center' });

  doc.end();
}
