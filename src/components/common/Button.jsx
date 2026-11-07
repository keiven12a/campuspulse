function Button({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary',

    secondary:
      'bg-accent text-white hover:bg-accent/90 focus-visible:outline-accent',

    outline:
      'border border-primary text-primary hover:bg-primary/5 focus-visible:outline-primary',
  }

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-5 py-3 text-base',
    large: 'px-7 py-3.5 text-base',
  }

  const selectedVariant = variants[variant] || variants.primary
  const selectedSize = sizes[size] || sizes.medium

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${selectedVariant} ${selectedSize} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button