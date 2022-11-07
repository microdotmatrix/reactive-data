import css from '@css/modules/contact.module.scss';

import { Form } from "react-router-dom";
import { usePageEffect } from '_h/page';

import Content from '_c/Content';


export default function Contact() {
  return (
    usePageEffect({ title: "Dont Contact Me..." }),
    
    <Content className="container">
      <Form method="post" action="/contact" className={css.contact}>
        <section>
          <label>
            Email
          </label>
          <input type="email" name="email" id="sender-email" />
        </section>
        <section>
          <label>
            Subject
            <br />
            <input type="text" name="title" />
          </label>
        </section>
        <section>
          <label htmlFor="content">Message:</label>
          <br />
          <textarea name="content" rows="10" cols="30" id="content" />
        </section>
        <section>
          <button type="submit">Save</button>
        </section>
      </Form>
    </Content>
  )
}