import React, { useState } from 'react';
import FAQ from '../components/FAQ';
import { Link } from 'react-router-dom';

/**
 * Provides the formatting for the FAQ page component to App.js.
 * @class
 * @version 0.1
 * @see react
 * @see Modules/FAQ
 * @see react-router-dom
 * @see Classes/App
 */
const FaqPage = () => {
  /**
   * This function provdes the HTML formatting for the FAQ page to App.js.
   * @function
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <a id="top"></a>
        <h1 className='title'>FAQs</h1>
        <hr />
        <div className='text-content'>
          <a href='#signup'> Can anyone sign up?</a> <br />
          <a href='#resume'> What should I include in my resume?</a> <br />
          <a href='#apply'> How do I apply to a job?</a> <br />
          <a href='#post'> How do I post a job?</a> <br />
        </div>
        <div id='signup' className='faqHeader'>
          <b>Can anyone sign up?</b>
          <br />
          <br />
          <div className='faqAnswer'>
            Absolutely! J4I is open to students and businesses interested in
            pursuing internships focused on providing opportunities in STEM
            fields.
            <br />
            <br />
            If you are a student who wants to put academic concepts into action,
            explore diverse occupations, develop your professional network, and
            gain real world experience/skills to make you more marketable, sign
            up now! <br />
            <br />
            If you are a business in the STEM field who would like to generate
            interest in your company, discover new talent through
            non-traditional recruitment methods, develop a strong pipeline for
            future talent, and provide your employees with management
            opportunities, sign up now! <br />
          </div>
        </div>

        <div id='resume' className='faqHeader'>
          <b>What should I include in my resume?</b>
          <br />
          <br />
          <div className='faqAnswer'>
            <i>Courtesy of the MIT Career Development Center</i>
            <br />
            <br />
            <b>Content</b>
            <ul>
              <li>
                Put name, address, and phone number at the top of the page. If
                you have a second page, repeat your name at the top.
              </li>
              <li>
                Choose topic headings that invite your readers’ interest, e.g.,
                ‘Experience’, ‘Leadership’, ‘Skills’, ‘Activities/ Honors’
                rather than “employment” or “other.”
              </li>
              <li>
                Include marketable and/or relevant data only; for example,
                include classes that have been most important in your education
                and are most relevant to the type of work you seek; do not
                provide an extensive list of courses.
              </li>
              <li>
                Highlight skills, accomplishments, capabilities, and work
                experience. Give evidence of your personal impact: show not only
                that you completed tasks but that you contributed to
                organizational goals.
              </li>
              <li>
                Cite numbers to convey size and/or scale of project, budget, and
                staff supervised.
              </li>
              <li>
                Give examples that demonstrate desirable personality traits such
                as leadership, interpersonal facility, teamwork, and initiative.
              </li>
              <li>
                Minimize personal information and omit unrelated memberships,
                age, marital and health status, and information that is
                repetitive, implicit
              </li>
              <li>
                Generally, it is a good idea to exclude data relevant to salary
                expectations, religious or political affiliations, and
                geographic descriptions.
              </li>
              <li>
                References are usually omitted. Employers assume that
                “references are available upon request,” so leave this phrase
                off.
              </li>
            </ul>
            <br />
            <b>Top 10 Pitfalls in Resume Writing </b>
            <ol>
              <li>Too long. Restrict your resume to one page. </li>
              <li>
                Typographical, grammatical, or spelling errors. Have at least
                two people proofread your resume.{' '}
              </li>
              <li>
                Hard to read. Keep it simple with clean lines and white space.{' '}
              </li>
              <li>
                Too verbose. Say as much as possible with as few words as
                possible, avoid use of jargon.{' '}
              </li>
              <li>
                Not enough information. Give dates describing related work
                experience, be specific about skills, accomplishments,
                activities, interests, and memberships.{' '}
              </li>
              <li>
                Irrelevant information. Customize each resume to each position
                you seek (when possible). Of course, include education and work
                experience, but emphasize relevant experience, skills,
                accomplishments and activities. Do not include marital status,
                age, sex, children, height, weight, health, church membership,
                etc.
              </li>
              <li>
                Obviously generic. Tweak each resume according to the job
                description. The employer needs to feel that you are interested
                in that particular position with his or her company.
              </li>
              <li>
                Too fancy. Of course, use good quality bond paper, but avoid
                exotic types, colored paper, photographs, binders, and graphics.
                Electronic resumes should include appropriate industry keywords
                and use a font size between 10-12 points. Use italics and
                bolding sparingly.{' '}
              </li>
              <li>
                Too static. Make your resume as dynamic as possible. Begin every
                statement with an action verb. Use active verbs to describe what
                you have accomplished in past jobs. Take advantage of your rich
                vocabulary and avoid repeating words, especially the first word
                in a section.{' '}
              </li>
              <li>
                Too modest. The resume showcases your qualifications in
                competition with the other applicants. Put your best foot
                forward without misrepresentation, falsification, or arrogance.
              </li>
            </ol>
            <b>Use Action Verbs!</b> <br />
            <br />
            In a resume, you want to use action verbs to highlight your
            involvement and value rather than having it in a passive voice. Did
            you spot that difference? Here is a link from{' '}
            <a target='_blank' href='https://www.indeed.com/'>
              Indeed.com
            </a>{' '}
            to assist in your creating an exciting narrative.
            <br />
            <br />
            <a
              target='_blank'
              href='https://www.indeed.com/career-advice/resumes-cover-letters/action-verbs-to-make-your-resume-stand-out'
            >
              195 Action Verbs to Make Your Resume Stand Out | Indeed.com
            </a>
          </div>
          <div className='back-to-top-button-container'>
            <div className='back-to-top-button'>
              <a href='#top'>
                <button className='button-back-to-top' type='submit' >
                  Back to Top
                </button>
              </a>
            </div>
          </div>
        </div>

        <div id='apply' className='faqHeader'>
          <b>How do I apply to a job?</b>
          <br />
          <br />
          <div className='faqAnswer'>
            <b>Step 1:</b> Sign up and create a robust profile
            <br />
            <b>Step 2:</b> Search for internships in your areas of interest
            <br />
            <b>Step 3:</b> Select the job and submit your application
            <br />
            <b>Step 4:</b> Make sure you prepare yourself for interviews
            <br />
            <ul>
              <li>
                {' '}
                Research popular questions that employers like to ask at
                interviews and have answers prepared and memorized.{' '}
              </li>
              <li>
                {' '}
                Make sure you are familiar with both behavioral and case
                interviewing techniques so you feel confident regardless of
                interview methodology.
              </li>
              <li>
                {' '}
                If it is a phone or virtual interview, identify ways to impress
                employers remotely.
              </li>
              <li>
                {' '}
                Make sure that you dress to impress, remember, this could be
                your future employer!
              </li>
              <li>
                {' '}
                If it is a paid internship, brush up on your negotiating skills
                so you feel you are fairly compensated.
              </li>
            </ul>
          </div>
          <div className='back-to-top-button-container'>
            <div className='back-to-top-button'>
              <a href='#top'>
                <button className='button-back-to-top' type='submit' >
                  Back to Top
                </button>
              </a>
            </div>
          </div>
        </div>

        <div id='post' className='faqHeader'>
          <b>How do I post a job?</b>
          <br />
          <br />
          <div className='faqAnswer'>
            <b>Step 1:</b> Sign up and create a robust profile
            <br />
            <b>Step 2:</b> Navigate to the business dashboard and select the
            Post Jobs option
            <br />
            <b>Step 3:</b> Create detailed descriptions of all the positions for
            which you are seeking an intern
            <br />
            <b>Step 4:</b> Review applications and select candidates of interest
            for next steps
            <br />
          </div>
          <div className='back-to-top-button-container'>
            <div className='back-to-top-button'>
              <a href='#top'>
                <button className='button-back-to-top' type='submit' >
                  Back to Top
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='back-button-container-bottom'>
          <div className='back-button'>
            <Link to='/'>
              {' '}
              <button className='button-back' type='submit'>
                Back
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
};

export default FaqPage;
