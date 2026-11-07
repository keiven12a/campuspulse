function Input({
  label,
  name,
  type = 'text',
  placeholder = '',
  error = '',
  disabled = false,
  className = '',
  ...props
}) {
  const inputId = props.id || name

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-lg border bg-surface px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-background disabled:opacity-60 ${
          error ? 'border-red-500' : 'border-border'
        } ${className}`}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default Input