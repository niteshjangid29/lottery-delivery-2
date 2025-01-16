import axios from "axios";

export const razorpayPayment = async (amount: number): Promise<"success" | "fail"> => {
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const isRazorpayLoaded = await loadRazorpayScript();
  if (!isRazorpayLoaded) {
    alert("Failed to load Razorpay SDK. Please try again.");
    return "fail";
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_LINK}/create-order`,
      { amount }
    );

    const { orderId, key } = response.data;

    return new Promise((resolve) => {
      const options: any = {
        key: key,
        amount: amount * 100,
        currency: "INR",
        name: "FullToss",
        description: "Lottery Purchase",
        order_id: orderId,
        handler: (response: any) => {
          alert("Payment Successful!");
          console.log("Payment response:", response);
          resolve("success");
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#6366F1",
        },
        method: ["upi", "card", "netbanking", "wallet"],
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", (response: any) => {
        alert("Payment Failed. Please try again.");
        console.error("Payment failed:", response.error);
        resolve("fail");
      });

      paymentObject.open();
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    alert("Something went wrong. Please try again.");
    return "fail";
  }
};
