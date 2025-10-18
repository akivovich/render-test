import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sendEmail } from "../redux/actions/emailActions";
import { resetEmailStatus } from "../redux/reducers/emailReducer";
import './EmailForm.css';

export default function EmailForm() {
  const dispatch = useAppDispatch();
  const { loading, successMessage, errorMessage } = useAppSelector((state) => state.email);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const empty = !to?.trim() && !subject?.trim() && !text?.trim();
    setEmpty(empty);
  }, [to, subject, text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendEmail({ to, subject, text }));
  };

  const handleClear = () => {
    setTo("");
    setSubject("");
    setText("");
    dispatch(resetEmailStatus()); // сбрасываем сообщения
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Кому"
        required
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Тема"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Сообщение"
        rows={4}
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button type="submit" disabled={loading}>Отправить</button>
        <button type="button" onClick={handleClear} disabled={empty}>Очистить</button>
      </div>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
}