import '../styles/about.css';
import { Link } from 'react-router-dom';

/**
 * This class provides the formatting for the about page to App.js.
 * @class
 * @version 0.1
 * @see react
 * @see styles/about.css
 * @see react-router-dom
 * @see Classes/App
 */
const About = () => {
  /**
   * Returns the HTML formatting for the about page to App.js.
   * @function
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>About Us</h1>
        <hr />
        <div className='text-content'>
          <h2>
            {' '}
            Hello, we’re Jobs4Interns, a new job listing site dedicated to help
            students find technology internships.
          </h2>
        </div>

        <div className='section-row'>
          <p>
            An effective apprenticeship program, specific to the STEM industry,
            is lacking in today’s education system. Students are typically
            prepared at universities according to curriculums, and not
            real-world application and expertise.
          </p>
        </div>

        <div className='section'>
          <img className='about-img-1' src='business.jpg' />
          <div className='column-text-right'>
            <h3>How Do We Help Employers?</h3>
            <p>
              J4I will act as a pipeline that turns interns into employees.
              Employers will have an invaluable understanding of the intern’s
              abilities and strengths through the evaluation of their work.
              J4I’s program will naturally reduce turnover, as students become
              skilled interns, and eventually, employees.
            </p>
          </div>
        </div>

        <div className='section'>
          <div className='column-text-left'>
            <h3>How Do We Help Students?</h3>
            <p>
              By enrolling in J4I’s program, students will be empowered to
              decide if they’re in the right field or if their major is
              misaligned with their strengths and abilities. Having this
              hands-on experience will allow students to make informed decisions
              about their future career path.
            </p>
          </div>
          <img className='about-img-2' src='students.jpg' />
        </div>
        <div className='section-row'>
          <h3>Our Unique Approach – 360 Degree Review</h3>
          <p>
            Through a proprietary database potential interns will create an
            online profile that includes a video cover letter, resume, specific
            college information (grades, extra-curricular activities, areas of
            study, etc.), general interests and activities, recommendations and
            referrals. These profiles will be available to J4I employment
            partners, allowing them to thoroughly review a potential intern.
            <br />
            <br />
            Once interns are placed with one of J4I’s employment partners they
            will provide a review of that company, list examples of their daily
            tasks, highlight key learning objectives they’re working towards,
            and review company management. This will allow potential interns to
            thoroughly review employment partners, better aligning their
            professional goals with internship opportunities.
          </p>
          <br />
          <div className='text-content'>
            <img src='360.png' />
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

export default About;
