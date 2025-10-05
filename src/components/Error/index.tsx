import css from "./style.module.css";

export default function Error({ error }: { error: string }) {
  return <p className={css.error}>Error: {error}</p>;
}
