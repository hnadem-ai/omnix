import "./Input.css";

export default function Input({ value, onChange, placeholder, type = 'text', ...props }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className="custom-input"
      {...props}
    />
  )
}