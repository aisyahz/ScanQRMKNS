document.addEventListener("DOMContentLoaded", () => {
  const qrReader = new Html5Qrcode("qr-reader");
  const startScanBtn = document.getElementById("start-scan-btn");
  const passengerList = document.getElementById("passenger-list");

  startScanBtn.addEventListener("click", async () => {
    try {
      const qrScannerContainer = document.getElementById("qr-scanner-container");

      const containerWidth = qrScannerContainer.offsetWidth;
      const containerHeight = qrScannerContainer.offsetHeight;
      const qrboxSize = Math.min(containerWidth, containerHeight) * 2.0;

      await qrReader.start(
        { facingMode: "environment" },
        {
          qrbox: qrboxSize,
        },
        async (qrCodeMessage) => {
          try {
            const qrCodeData = JSON.parse(qrCodeMessage);
            console.log("Parsed QR Code Data:", qrCodeData);

            // Append scanned data to the passenger list table
            const newRow = passengerList.insertRow();
            const nameCell = newRow.insertCell(0);
            const nomborCell = newRow.insertCell(1);
            const emailCell = newRow.insertCell(2);

            nameCell.textContent = qrCodeData.name;
            nomborCell.textContent = qrCodeData.nombor;
            emailCell.textContent = qrCodeData.email;

            await qrReader.stop();
          } catch (error) {
            console.error("Error parsing QR code data:", error);
          }
        }
      );
    } catch (err) {
      console.error("Error starting QR code scanner:", err);
    }
  });
});
