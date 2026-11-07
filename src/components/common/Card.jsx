function Card({
  children,
  padding = 'medium',
  className = '',
  ...props
}) {
  const paddingStyles = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  }

  const selectedPadding = paddingStyles[padding] || paddingStyles.medium

  return (
    <div
      {...props}
      className={`rounded-xl border border-border bg-surface shadow-sm ${selectedPadding} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card