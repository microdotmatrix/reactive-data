import css from '../styles/modules/contact.module.scss';
import { Form } from "react-router-dom";
import Content from '_c/Content';


export default function Contact() {
  return (
    <Content>
      <Form method="post" action="/contact" className={css.contact}>
        <div className={css.block}>
          <label>
            Email
          </label>
          <input type="email" name="email" id="sender-email" />
        </div>
        <div className={css.block}>
          <label>
            Subject
            <br />
            <input type="text" name="title" />
          </label>
        </div>
        <div className={css.block}>
          <label htmlFor="content">Message:</label>
          <br />
          <textarea name="content" rows="10" cols="30" id="content" />
        </div>
        <div className={css.block}>
          <button type="submit">Save</button>
        </div>
      </Form>
    </Content>
  )
}