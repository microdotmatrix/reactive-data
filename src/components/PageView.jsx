import React from 'react'

export default function PageView({ page }) {
  return <div dangerouslySetInnerHTML={{ __html: page.content }} />
}
