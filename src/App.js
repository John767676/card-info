import React, {useState} from 'react';
import {useForm} from "react-hook-form";

const App = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm({mode: "onBlur"})
    const [formData,setFormData] = useState({})

    const onSubmit = (data) => {
        setFormData(data)
        reset()
    }

    function formatCardNumber(cardNumberString) {
        let cleaned = ('' + cardNumberString).replace(/\D/g, '');
        let match = cleaned.match(/(\d{4})(\d{4})(\d{4})(\d{4})$/);
        if (match) {
            return  [match[1],' ', match[2],' ', match[3],' ', match[4]].join('');
        }
        return null;
    }

    function formatDate(date) {
        if (date.length === 1) {
            return ('0' + date)
        }
        return date
    }

    return (
        <div className="field">
            <div className="left-section"></div>
                <div className="central-section">
                    <div className="face-side">
                        <div className="container">
                            <div className="logo"></div>
                            <div className="face-side-container">
                                <div className="face-side-numbers">
                                    {formData.number ? formatCardNumber(formData.number) : formatCardNumber('0000000000000000')}
                                </div>
                                <div className="bottom-face-side">
                                    <div className="face-side-name">
                                        {formData.name ? formData.name : 'JANE APPLESEED'}
                                    </div>
                                    <div className="face-side-date">
                                        {(formData.MM && formData.YY) ? formatDate(formData?.MM) + '/' + formatDate(formData.YY) : '00/00'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="back-side">
                        <div className="back-side-cvc">
                            {formData.CVC ? formData?.CVC : '000'}
                        </div>
                    </div>
                </div>
            <div className="right-section">
                <div className="form-section">
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="name">
                            <label>
                                CARDHOLDER NAME
                            </label>
                                <input style={errors?.name ? {border: '1px solid red'} : {border: '1px solid lightgrey'}} autoComplete='off' placeholder='e.g. Jane Appleseed' size='30' maxLength='25'
                                    {...register('name',{
                                    required: 'Required field',
                                        pattern: {
                                        value: /^[A-Za-z]+$/,
                                            message: 'Use only latin letters'
                                        }
                                })}/>
                            {errors?.name && <p style={{color: 'red', fontSize: '14px'}}>{errors?.name?.message || 'Error'}</p>}
                        </div>
                        <div className="number">
                            <label>
                                CARD NUMBER
                            </label>
                            <input autoComplete='off' placeholder='e.g. 1234 5678 9123 000' size='30' maxLength="16" style={errors?.number ? {border: '1px solid red'} : {border: '1px solid lightgrey'}}
                                   {...register('number',{
                                       required: 'Required field',
                                       minLength: {
                                           value: 16,
                                           message: 'Must be 16 symbols'
                                       },
                                       pattern: {
                                           value: /^[0-9]*$/,
                                           message: 'Only numbers'
                                       }
                                   })}/>
                            {errors?.number && <p style={{color: 'red', fontSize: '14px'}}>{errors?.number?.message || 'Error'}</p>}
                        </div>
                        <div className="date-cvc">
                            <div className="date">
                                <label>
                                    EXP. DATE (MM/YY)
                                </label>
                                <input style={errors?.MM ? {border: '1px solid red'} : {border: '1px solid lightgrey'}} autoComplete='off' placeholder='MM' size='5' maxLength="2"
                                           {...register('MM',{
                                               required: 'Required field',
                                               pattern: {
                                                   value: /(^0?[1-9]$)|(^1[0-2]$)/,
                                                   message: 'Only numbers in range of 1-12'
                                               },
                                           })}/>
                                <input style={errors?.YY ? {border: '1px solid red', marginLeft: '20px'} : {border: '1px solid lightgrey', marginLeft: '20px'}} autoComplete='off' placeholder='YY' size='5' maxLength="2"
                                           {...register('YY',{
                                               required: 'Required fields',
                                               pattern: {
                                                   value: /(^0?[1-9]$)|(^1[0-2]$)/,
                                                   message: 'Only numbers in range of 1-12'
                                               },
                                           })}/>
                            {(errors?.YY || errors?.MM) && <p style={{color: 'red', fontSize: '14px'}}>{errors?.YY?.message || errors?.MM?.message}</p>}
                            </div>
                            <div className="cvc">
                                <label>
                                    CVC
                                </label>
                                <input style={errors?.CVC ? {border: '1px solid red'} : {border: '1px solid lightgrey'}} autoComplete='off' placeholder='e.g. 123' size='10' maxLength="3"
                                       {...register('CVC',{
                                           required: 'Required field',
                                           pattern: {
                                               value: /^[0-9]*$/,
                                               message: 'Only numbers'
                                           }
                                       })}/>
                                {errors?.CVC && <p style={{color: 'red', fontSize: '14px'}}>{errors?.CVC?.message || 'Error'}</p>}
                            </div>
                        </div>
                        <div className="button-div">
                            <button className='button-submit' type='submit'>Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;