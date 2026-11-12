
import { useState } from 'react'
import Card from '../../components/common/Card.jsx'
import Input from '../../components/common/Input.jsx'
import Textarea from '../../components/common/Textarea.jsx'
import Button from '../../components/common/Button.jsx'

function ReportIssue() {
  const [formData, setFormData] = useState({
  title: '',
  category: '',
  description: '',
  location: '',
})
  // Image upload states
  const [imagePreview, setImagePreview] = useState('')
const [imageError, setImageError] = useState('')
const [errors, setErrors] = useState({})
const [successMessage, setSuccessMessage] = useState('')
  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }
function handleImageChange(event) {
  const file = event.target.files[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    setImageError('Please select a valid image file.')
    setImagePreview('')
    event.target.value = ''
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    setImageError('Image size must be less than 5 MB.')
    setImagePreview('')
    event.target.value = ''
    return
  }

  setImageError('')
  setImagePreview(URL.createObjectURL(file))
}
function validateForm() {
  const newErrors = {}

  if (!formData.title.trim()) {
    newErrors.title = 'Report title is required.'
  } else if (
    formData.title.trim().length < 5 ||
    formData.title.trim().length > 100
  ) {
    newErrors.title = 'Title must be between 5 and 100 characters.'
  }

  if (!formData.category) {
    newErrors.category = 'Please select an issue category.'
  }

  if (!formData.description.trim()) {
    newErrors.description = 'Description is required.'
  } else if (formData.description.trim().length < 20) {
    newErrors.description = 'Description must be at least 20 characters.'
  }

  if (!formData.location) {
    newErrors.location = 'Please select the campus location.'
  }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0
}

function handleSubmit(event) {
  event.preventDefault()

  setSuccessMessage('')

  const isValid = validateForm()

  if (!isValid) {
    return
  }

  console.log('Report details:', formData)

  setSuccessMessage(
    'Your report has been submitted successfully!'
  )

  setFormData({
    title: '',
    category: '',
    description: '',
    location: '',
  })

  setErrors({})
}

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section>
        <p className="text-sm font-medium text-primary">
          Student Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold text-text-primary">
          Report a Campus Issue
        </h1>

        <p className="mt-2 text-text-secondary">
          Help improve our campus by reporting problems you notice.
        </p>
      </section>

      <Card padding="large">
        <form onSubmit={handleSubmit} className="space-y-6">
         
          <Input
            label="Report Title"
            name="title"
            placeholder="e.g. Broken streetlight near the library"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
          />

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Issue Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select an issue category</option>
              <option value="water">Water Supply</option>
              <option value="electricity">Electricity</option>
              <option value="waste">Waste Management</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="safety">Safety and Security</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
  <p className="mt-2 text-sm text-red-600" role="alert">
    {errors.category}
  </p>
)}
          </div>

          <Textarea
  label="Description"
  name="description"
  placeholder="Describe the problem and explain how it affects the campus..."
  value={formData.description}
  onChange={handleChange}
  rows={5}
  error={errors.description}
/>
     <div>
  <label
    htmlFor="location"
    className="mb-2 block text-sm font-medium text-text-primary"
  >
    Campus Location
  </label>

  <select
    id="location"
    name="location"
    value={formData.location}
    onChange={handleChange}
    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
  >
    <option value="">Select the issue location</option>
    <option value="Main Gate">Main Gate</option>
    <option value="Library">Library</option>
    <option value="Student Cafeteria">Student Cafeteria</option>
    <option value="Academic Block">Academic Block</option>
    <option value="Dormitories">Dormitories</option>
    <option value="Sports Field">Sports Field</option>
    <option value="Other">Other</option>
  </select>
  {errors.location && (
  <p className="mt-2 text-sm text-red-600" role="alert">
    {errors.location}
  </p>
)}
</div>     
<div>
  <label
    htmlFor="report-image"
    className="mb-2 block text-sm font-medium text-text-primary"
  >
    Attach an Image (Optional)
  </label>

  <input
    id="report-image"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-secondary"
  />

  {imageError && (
    <p className="mt-2 text-sm text-red-600" role="alert">
      {imageError}
    </p>
  )}

  {imagePreview && (
    <div className="mt-4">
      <img
        src={imagePreview}
        alt="Selected report preview"
        className="h-48 w-full rounded-lg border border-border object-cover"
      />

      <button
        type="button"
        onClick={() => {
          setImagePreview('')
          document.getElementById('report-image').value = ''
        }}
        className="mt-2 text-sm font-medium text-red-600 hover:underline"
      >
        Remove Image
      </button>
    </div>
  )}
</div>
{successMessage && (
  <p
    className="rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700"
    role="status"
  >
    {successMessage}
  </p>
)} 
          <Button type="submit" className="w-full">
            Submit Report
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default ReportIssue
