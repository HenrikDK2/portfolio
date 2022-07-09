import { useState, FC } from "react";
import { css, styled } from "goober";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../atoms/Buttons";
import useObserver from "preact-intersection-observer";
import { LineHeading } from "../atoms/LineHeading";

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phonePattern = /[\d ()+-]{8,}/;

const FormElem = styled("form")`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  width: 100%;
  font-family: "roboto";
  box-sizing: border-box;
  padding: 0 1rem;
  row-gap: 10px;
  color: var(--color);
  & input,
  textarea {
    font-size: 1.5rem;
    border: 1px solid #f3f3f3;
    box-sizing: border-box;
    user-select: text;
    height: 77px;
    outline: none;
    background: #f3f3f3;
    padding: 0 1rem;
    width: 100%;
    font-weight: 400;
    font-family: "roboto";
    &::placeholder {
      font-size: 1.5rem;
      color: rgba(0, 0, 0, 0.4);
      opacity: 1;
    }
  }

  textarea {
    font-size: 1rem;
  }
`;

const buttonStyle = css`
  margin: 0 auto 0 0;
  width: 292px;
  font-weight: 700;
  &:hover {
    transform: none;
  }
  @media (max-width: 700px) {
    font-size: 1.5rem;
  }

  @media (max-width: 1090px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const textareaMessage = css`
  resize: none;
  height: 200px !important;
  padding: 20px !important;
`;

const spanStyle = css`
  margin-top: -10px;
  display: block;
  text-align: left;
  color: rgba(252, 36, 3, 0.75);
  font-weight: bold;
`;

const intersectOptions = {
  triggerOnce: true,
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const articleKontakt = css`
  max-width: 519px;
  margin: 0 1rem;
  width: 100%;
  opacity: 0;
  & h2 {
    display: inline-block;
    font-size: 3rem;
    font-weight: 400;
    margin: 0 0 2rem 20px;
    @media (max-width: 1090px) {
      margin: 0 0 2rem 0;
    }
  }

  & form {
    margin: 0;
  }
  @media (max-width: 1090px) {
    text-align: center;
  }
`;

const ErrorMsg = styled("p")`
  display: block;
  background-color: #f2dede;
  padding: 20px;
  margin-top: 0;
  color: #b03b46; ;
`;

const SuccessMsg = styled(ErrorMsg)`
  background-color: #e5f2de;
  color: #217b33;
`;

const textareaError = css`
  border: 1px solid #cc3300;
`;

const fadeUpAnim = css`
  animation: fadeUp 1s forwards;
`;

interface FormValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type Response = {
  status: number;
  body?: any;
};

export const Form: FC = () => {
  const [response, setResponse] = useState<Response>();
  const [intersectRef, inView] = useObserver(intersectOptions);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [hideForm, setHideForm] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    if (disableButton === true) return;
    setDisableButton(true);
    fetch("/.netlify/functions/sendForm", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res: any) => setResponse(res))
      .catch((err: any) => {
        setResponse(err);
        setDisableButton(false);
      });
  };

  const hideFormInline = css`
    display: ${hideForm ? "none" : "block"};
  `;

  const articleContactStyle = `${articleKontakt} ${hideFormInline} ${
    inView && fadeUpAnim
  }`;

  return (
    <article
      ref={intersectRef}
      onAnimationEnd={(e) => e.animationName === "fadeOut" && setHideForm(true)}
      className={articleContactStyle}
    >
      <LineHeading>Kontakt Mig</LineHeading>
      <FormElem onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <label htmlFor="name" aria-label="Navn inputfelt">
          <input
            placeholder="Navn*"
            type="text"
            {...register("name", {
              required: { value: true, message: "Dette felt er påkrævet" },
              minLength: {
                value: 2,
                message: "Navn skal være mindst 2 bogstaver",
              },
            })}
          />
        </label>
        <span className={spanStyle}>{errors.name && errors.name.message}</span>
        <label htmlFor="phone" aria-label="Telefon inputfelt">
          <input
            placeholder="Telefon"
            type="text"
            {...register("phone", {
              minLength: {
                value: 8,
                message: "Telefon skal være mindst 8 tal",
              },
              pattern: {
                value: phonePattern,
                message:
                  "Telefon nummer må ikke indeholde bogstaver eller tommefelter",
              },
            })}
          />
        </label>
        <span className={spanStyle}>
          {errors.phone && errors.phone.message}
        </span>
        <label htmlFor="email" aria-label="Email inputfelt">
          <input
            placeholder="Email*"
            type="text"
            {...register("email", {
              required: { value: true, message: "Dette felt er påkrævet" },
              pattern: {
                value: emailPattern,
                message:
                  "Email er ikke gyldig, dette er et eksempel på en gyldig email: example@live.dk",
              },
            })}
          />
        </label>
        <span className={spanStyle}>
          {errors.email && errors.email.message}
        </span>
        <label htmlFor="name" aria-label="Besked inputfelt">
          <textarea
            placeholder="Besked*"
            className={`${textareaMessage} ${errors.message && textareaError}`}
            {...register("message", {
              required: { value: true, message: "Dette felt er påkrævet" },
              minLength: { value: 80, message: "Beskeden er for kort" },
            })}
          />
        </label>
        <span className={spanStyle}>
          {errors.message && errors.message.message}
        </span>
        {response && response.status === 200 ? (
          <SuccessMsg>Email var sendt 😄</SuccessMsg>
        ) : (
          response && (
            <ErrorMsg>
              Fejl besked: {response && response?.body} (
              {response && response.status})
            </ErrorMsg>
          )
        )}
        <PrimaryButton disabled={disableButton} className={buttonStyle}>
          Send
        </PrimaryButton>
      </FormElem>
    </article>
  );
};
