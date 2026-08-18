type TData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const sendEmail = async (data: TData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || "https://janardhan-portfolio-server.vercel.app/api/v1"}/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to send message");
    }
    const responseData = await res.json();
    return { data: responseData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
