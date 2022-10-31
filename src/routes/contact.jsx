import { Form } from "react-router-dom"
import Content from '_c/Content';

export default function Contact() {
  return (
    <Content>
      <Form method="post" action="/contact">
        <p>
          <label>
            Subject
            <br />
            <input type="text" name="title" className="form-input" />
          </label>
        </p>
        <p>
          <label htmlFor="content">Message:</label>
          <br />
          <textarea name="content" rows="10" cols="30" id="content" className="form-textarea" />
        </p>
        <p>
          <button type="submit">Save</button>
        </p>
      </Form>
    </Content>
  )
}