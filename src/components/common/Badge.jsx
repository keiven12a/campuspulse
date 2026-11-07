function Badge({
  status = 'pending',
  children,
  className = '',
  ...props
}) {
  const statusStyles = {
    pending: 'bg-pending/10 text-pending',
    'in-progress': 'bg-in-progress/10 text-in-progress',
    resolved: 'bg-resolved/10 text-resolved',
    rejected: 'bg-rejected/10 text-rejected',
  }

  const selectedStyle =
    statusStyles[status] || statusStyles.pending

  const label =
    children ||
    status
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  return (
    <span
      {...props}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${selectedStyle} ${className}`}
    >
      {label}
    </span>
  )
}

export default Badge