import {useState} from 'react'

export default function useForm(initial = {}) {
    const [inputs, setInputs] = useState(initial);
    

    function handleChange(e) {

        let { value, name, type } = e.target;
        if (type === 'number') {
            value = parseInt(value);     
        }
        if (type === 'file') {
            [value] = e.target.files;
        }

        setInputs({
            ...inputs,
            [name] : value,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blank = Object.fromEntries(Object.entries(inputs).map( ([key, value]) => [key, '']));
        return setInputs(blank);
    }

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    }
}