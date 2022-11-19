import css from '@css/modules/contact.module.scss';
import Helmet from 'react-helmet';
import { Form } from "react-router-dom";
import { usePageEffect } from '_h/page';


export default function Contact() {
  return (
    
    <>
      <Helmet>
        <title>Contact me today!</title>
        <meta name="description" content="Contact me today!" />
      </Helmet>
      <div className='page-view contact-page'>
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
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </section>
        </Form>
      </div>
    </>
  )
}