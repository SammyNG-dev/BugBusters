import type React from "react";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./SubscriptionForm.css";

type SubscriptionDatas = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface SubscriptionFormProps {
  children: React.ReactNode;
  defaultValue: SubscriptionDatas;
  submitted: (subscription: SubscriptionDatas) => void;
}

function SubscriptionForm({
  children,
  defaultValue,
  submitted,
}: SubscriptionFormProps) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  return (
    <fieldset id="subscription-fieldset">
      <h1 id="title-subs">S'inscrire</h1>
      <form
        id="subscription-form"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          if (!isCheckboxChecked) {
            alert(
              "Vous devez accepter les conditions générales pour vous inscrire.",
            );
            return;
          }

          const subscriptionDatas = new FormData(event.currentTarget);
          const firstname = subscriptionDatas.get("firstname") as string;
          const lastname = subscriptionDatas.get("lastname") as string;
          const email = subscriptionDatas.get("email") as string;
          const password = subscriptionDatas.get("password") as string;
          const confirmPassword = subscriptionDatas.get(
            "confirm-password",
          ) as string;
          submitted({
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
          });
        }}
      >
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          className="subscription-field"
          name="firstname"
          defaultValue={defaultValue.firstname}
          required
        />
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          className="subscription-field"
          name="lastname"
          defaultValue={defaultValue.lastname}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="subscription-field"
          name="email"
          defaultValue={defaultValue.email}
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          className="subscription-field"
          name="password"
          defaultValue={defaultValue.password}
          required
        />
        <label htmlFor="confirm-password">Confirmer le mot de passe</label>
        <input
          type="password"
          className="subscription-field"
          name="confirm-password"
          defaultValue={defaultValue.confirmPassword}
          required
        />

        <div>
          <input
            type="checkbox"
            id="conditions-checkbox"
            name="conditions"
            className="checkbox"
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
            required
            aria-required="true"
          />
          <label htmlFor="conditions-checkbox">
            J'accepte les{" "}
            <a href="/conditions" target="_blank" rel="noreferrer">
              conditions générales
            </a>
          </label>
        </div>

        <button id="pixel-subs" type="submit">
          {children}
        </button>
      </form>
    </fieldset>
  );
}

export default SubscriptionForm;
