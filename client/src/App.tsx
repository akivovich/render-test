import EmailForm from "./components/EmailForm";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Отправка Email</h1>
      <EmailForm />
    </div>
  );
}

export default App;