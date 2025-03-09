import { useState, useEffect } from "react";

interface ApiResponse {
  qr: string;
}

const QrCode = () => {
  const [qrImage, setQrImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const response = await fetch(
          "https://apis-merchant.qa.deunalab.com/merchant/v1/payment/request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-secret": "70aa3a0caa6341f88b67ebb167ef7a50",
            },
            body: JSON.stringify({
              pointOfSale: "4121565",
              qrType: "dynamic",
              amount: 5.19,
              detail: "test postman GEO",
              internalTransactionReference: "IXWAHROMYSCEZWQ",
              format: "2",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        // Asegurar que la imagen tenga el prefijo correcto
        if (data.qr.startsWith("data:image/png;base64,")) {
          setQrImage(data.qr);
        } else {
          setQrImage(`data:image/png;base64,${data.qr}`);
        }
      } catch (error) {
        console.error("Error al obtener el código QR", error);
      }
    };

    fetchQr();
  }, []);

  return (
    <div className="qr">
      {qrImage ? (
        <img src={qrImage} alt="QR Code" />
      ) : (
        <p>Cargando QR...</p>
      )}
    </div>
  );
};

export default QrCode;
