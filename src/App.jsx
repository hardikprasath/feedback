import React from 'react';
import "./App.css";
import { useForm, Controller } from 'react-hook-form';
import { BiSolidLike } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RadioGroup, Box } from "@mui/material";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';


/*emoji style start */

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
/*emoji style end */

function App() {

  const { handleSubmit, control, register, setValue, getValues, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const res = await fetch('https://feedback-70a39-default-rtdb.firebaseio.com/UserData.json', options);
    if (res.ok) {
      alert("Message Sent");
    } else {
      alert("Error Occurred");
    }
    reset();
  };

  const handleEdit = (field) => {
    const currentValue = getValues(field);
    setValue(field, currentValue);
  };

  const handleDelete = (field) => {
    setValue(field, '');
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   reset();
  // };

  // const handleEdit = (field) => {
  //   const currentValue = getValues(field);
  //   setValue(field, currentValue);
  // };

  // const handleDelete = (field) => {
  //   setValue(field, '');
  // };

  // const getdata = async (e) => {
  //   const { comment, numberRating, Rating, emoji, suggestion, radioGroup } = user;
  //   e.preventDefault();
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }, 
  //     body: JSON.stringify({
  //       comment, numberRating, Rating, emoji, suggestion, radioGroup
  //     })
  //   }
  //   const res = await fetch(
  //     'https://feedback-70a39-default-rtdb.firebaseio.com/UserData.json',
  //     options
  //   )
  //   console.log(res)
  //   if(res){
  //     alert("Message Sent")
  //   }
  //   else{
  //     alert("Error Occured")
  //   }
  // }

  return (
    <div>
      <div className='navbar'>
        <div className='icon-heading'>
          <BiSolidLike style={{ fontSize: "23px" }} />
          <h3>USER FEEDBACK</h3>
        </div>

        <div className='button'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span><button className='btn-save' >SAVE</button></span>
            <span><button className='btn-publish'>PUBLISH</button></span>
          </form>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="feedback-form">
        <div className='feedback-form-heading'>
          <MdKeyboardArrowLeft className='left-arrow-icon' />
          <h3>Generic Website Rating</h3>
          <MdEdit className='edit-icon' />
        </div>

        <div className='feedback-form-details'>
          <div className='form-cmt'>
            <p>Would you like to add a comment?</p>
            <textarea
              className='cmt-textfield'
              {...register('comment', { required: true })}
              placeholder="Enter your comment here"
            />
            {errors.comment && (
              <p style={{ color: 'red', position: "absolute", top: "75%", marginLeft: "2px" }}>
                This field is required
              </p>
            )}
            <div className='edit-delete-icon'>
              <MdEdit className='feedback-edit-icon' onClick={() => handleEdit('comment')} />
              <MdDelete className='feedback-delete-icon' onClick={() => handleDelete('comment')} />
            </div>
          </div>

          <div className='number-rating'>
            <p>How likely is that you will recommend to your family and friends?</p>
            <Controller
              name="numberRating"
              control={control}
              defaultValue=""
              rules={{ required: "Rating is required" }}
              render={({ field }) => (
                <>
                  <RadioGroup
                    style={{ marginLeft: "8px" }}
                    row
                    {...field}
                    onChange={(event) => field.onChange(parseInt(event.target.value, 10))}
                  >
                    {[...Array(10)].map((_, index) => (
                      <Box
                        key={index + 1}
                        sx={{
                          display: 'inline-block',
                          width: "42.5px",
                          height: "32px",
                          border: "1px solid #ccc",
                          textAlign: "center",
                          lineHeight: "32px",
                          cursor: "pointer",
                          backgroundColor: field.value === index + 1 ? "#1976d2" : "#fff",
                          color: field.value === index + 1 ? "#fff" : "#000",
                          '&:hover': {
                            backgroundColor: "#f0f0f0",
                          }
                        }}
                        onClick={() => field.onChange(index + 1)}
                      >
                        {index + 1}
                      </Box>
                    ))}
                  </RadioGroup>
                  {errors.numberRating && <p style={{ color: 'red' }}>This field is required</p>}
                </>
              )}
            />
            <div className='rating-edit-delete-icon'>
              <MdEdit className='rating-edit-icon' onClick={() => handleEdit('numberRating')} />
              <MdDelete className='rating-delete-icon' onClick={() => handleDelete('numberRating')} />
            </div>
          </div>

          <div className='star-rating'>
            <p>Give a star rating for the website</p>
            <Controller
              name="Rating"
              control={control}
              defaultValue=""
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <div style={{ position: 'relative' }}>
                  <Rating
                    style={{ marginLeft: "4px" }}
                    {...field}
                    value={field.value || 0}
                    onChange={(_, value) => field.onChange(value)}
                    precision={0.5}
                  />
                  {errors.Rating && (
                    <p style={{ color: 'red', position: "absolute", top: "60%", marginTop: "4px" }}>
                      {errors.Rating.message}
                    </p>
                  )}
                </div>
              )}
            />
            <div className='star-rating-icon'>
              <MdEdit className='star-rating-edit-icon' onClick={() => handleEdit('Rating')} />
              <MdDelete className='star-rating-delete-icon' onClick={() => handleDelete('Rating')} />
            </div>
          </div>

          <div className='emoji-rating'>
            <p>What is your opinion of this page?</p>
            <Controller
              name="emoji"
              control={control}
              defaultValue=""
              rules={{ required: 'Please select a rating' }}
              render={({ field }) => (
                <div style={{ position: "relative" }}>
                  <Rating
                    style={{ marginLeft: "6px" }}
                    {...field}
                    name="emoji"
                    defaultValue=""
                    precision={1}
                    IconContainerComponent={IconContainer} // Assuming you have an IconContainer component
                    highlightSelectedOnly
                  />
                  {errors.emoji && (
                    <p style={{ color: 'red', position: "absolute", top: "20px" }}>
                      This field is required
                    </p>
                  )}
                </div>
              )}
            />
            <div className='emoji-rating-icon'>
              <MdEdit className='emoji-rating-edit-icon' onClick={() => handleEdit('emoji')} />
              <MdDelete className='emoji-rating-delete-icon' onClick={() => handleDelete('emoji')} />
            </div>
          </div>

          <div className='input-field'>
            <p>Do you have any suggestions to improve our website?</p>
            <Controller
              name="suggestion"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    id="suggestion"
                    className='suggestion-field'
                    {...field}
                    placeholder="Enter your suggestion"
                  />
                </div>
              )}
            />
            {errors.suggestion && (
              <p className='input-field-error'>
                {errors.suggestion.message}
              </p>
            )}
            <div className='input-rating-icon'>
              <MdEdit className='input-rating-edit-icon' onClick={() => handleEdit('suggestion')} />
              <MdDelete className='input-rating-delete-icon' onClick={() => handleDelete('suggestion')} />
            </div>
          </div>

          <div className='radio-btn' style={{ position: 'relative' }}>
            <p>Multiple Choice - 1 Answer</p>
            <FormControl>
              <Controller
                name="radioGroup"
                control={control}
                defaultValue=""
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    {...field}
                    style={{ marginLeft: "6px", fontSize: "10px" }}
                  >
                    <FormControlLabel
                      value="Radio 1"
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />}
                      label="Radio 1"
                    />
                    <FormControlLabel
                      value="Radio 2"
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />}
                      label="Radio 2"
                    />
                    <FormControlLabel
                      value="Radio 3"
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />}
                      label="Radio 3"
                    />
                  </RadioGroup>
                )}
              />
              {errors.radioGroup && (
                <p style={{ color: 'red', marginTop: '-10px' }}>{errors.radioGroup.message}</p>
              )}
            </FormControl>
            <div className='radio-rating-icon'>
              <MdEdit className='radio-rating-edit-icon' onClick={() => handleEdit('radioGroup', 'Radio 1')} />
              <MdDelete className='radio-rating-delete-icon' onClick={() => handleDelete('radioGroup')} />
            </div>
          </div>
        </div>
      </form>

    </div>

  )
}

export default App
