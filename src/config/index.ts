const config = {
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || "https://janardhan-portfolio-server.vercel.app/api/v1",
  resendApiKey: process.env.RESEND_API_KEY,
  cvUrl:
    process.env.NEXT_PUBLIC_CV_URL ||
    "https://drive.google.com/file/d/1GVFQmxkYdflpjjkOeXIXWI7bDEtrwVyn/view?usp=sharing",
};

export default config;
