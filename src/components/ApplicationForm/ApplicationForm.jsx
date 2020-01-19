import React, { useState, useCallback } from 'react';
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import Button from "../Button";
import Input from "../Input";
import AnimatedList from "../AnimatedList";

const LoaderWrapper = styled.div`
  text-align: center;
`;

const USER_FORM = [
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },
  {
    name: 'title',
    label: 'Title',
    placeholder: 'What do you do?',
  },
  {
    name: 'story',
    label: 'Story',
    rows: 4,
    placeholder: 'Tell us something interesting about yourself!',
  },

  // @NOTE react-color does not appear to be working as expected, but looks pretty cool!
  {
    name: 'favoriteColor',
    label: 'Favorite Color',
    type: 'color',
    placeholder: 'HEX / RGB / Named (black, red, ...)',
  },

  // @TODO create image uploader input
  {
    name: 'photoUrl',
    label: 'Photo URL',
    placeholder: 'https://mydomain.com/me.jpg',
  },
];

const FormButton = styled(Button)`
  margin-top: 48px;
`;

// @TODO store common endpoints in a constants file
const TEAM_ENDPOINT = '/team';

const INITIAL_VALUES = USER_FORM.reduce((fields, field) => ({
  ...fields,
  [field.name]: '',
}), {});

export default function ApplicationForm({ onApply }) {
  const [displayForm, setDisplayForm] = useState(false);
  const [form, setForm] = useState(INITIAL_VALUES);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    setLoading(true);

    await fetch(TEAM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    await onApply();

    setForm(INITIAL_VALUES);
    setDisplayForm(false);

    setLoading(false);
  }, [form, onApply, setForm, setDisplayForm]);

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader type="Rings" color="#ccc" />
        <p>Please wait...</p>
      </LoaderWrapper>
    );
  }

  if (displayForm) {
    return (
      <AnimatedList
        items={[
          ...USER_FORM.map(field => (
            <Input
              key={field.label}
              {...field}
              onChange={value => {
                // @TODO switch to use Immer for observable rather than redefining entire form on change
                setForm({
                  ...form,
                  [field.name]: value,
                });
              }}
              value={form[field.name]}
            />
          )),
          <FormButton onClick={onSubmit} disabled={Object.values(form).some(value => !value)}>
            Apply
          </FormButton>
        ]}
      />
    );
  }

  return (
    <Button onClick={() => setDisplayForm(true)}>
      Join the team!
    </Button>
  );
}

ApplicationForm.propTypes = {
  onApply: PropTypes.func.isRequired,
};