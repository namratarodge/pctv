export default function TestPdfPage() {
  return (
    <div style={{ height: "100vh", padding: 20 }}>
      <h1>PDF iframe test</h1>
      <iframe
        src="https://projectcontrolexpo.s3.eu-west-1.amazonaws.com/assets/user_assets/2025-26/Bootcamp-Roadmap-to-Mastering-AI-in-Total-Cost-Management_Lance+Stephenson-+Global-Edition.pdf"
        width="100%"
        height="600"
        style={{ border: "0" }}
      />
    </div>
  );
}