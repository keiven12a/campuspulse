function Textarea({
  label,
  name,
  placeholder = '',
  rows = 4,
  error = '',
  disabled = false,
  className = '',
  ...props
}) {
  const textareaId = props.id || name

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}

      <textarea
        {...props}
        id={textareaId}
        name={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`w-full resize-y rounded-lg border bg-surface px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-background disabled:opacity-60 ${
          error ? 'border-red-500' : 'border-border'
        } ${className}`}
      />

      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default Textarea