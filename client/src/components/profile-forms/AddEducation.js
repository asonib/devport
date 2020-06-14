import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect }from 'react-redux';
import { addEducation }from '../../actions/profile';
import { Link } from 'react-router-dom';

const AddEducation = ({addEducation, history}) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        addEducation(formData, history);
    }

    const [toDateDisabled, toggleDisabled] = useState(false);

    return (
        <Fragment>
            <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="* School Name" name="school" value={school} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Degree Name" name="degree" value={degree} onChange={e => onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)}/>
        </div>
         <div class="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
              setFormData({...formData, current: !current});
              toggleDisabled(!toDateDisabled)
          }}/> Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled={toDateDisabled ? 'disabled': ''}value={to} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Education Description"
            onChange={e => onChange(e)}
            value={description}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(AddEducation);
