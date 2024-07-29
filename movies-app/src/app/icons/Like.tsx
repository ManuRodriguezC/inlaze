import styles from "@/app/styles/categories.module.css";
import useStore from "../store/store";

type LikeProps = {
  movie: any;
};

export default function Like({ movie }: LikeProps) {
  const { updateFavoriteList, login } = useStore();

  const handleClick = () => {
    if (login) {
      updateFavoriteList(movie);
    } else {
    }
  };

  return (
    <svg
      onClick={handleClick}
      style={{ cursor: login ? 'pointer' : 'not-allowed' }}
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="19"
      viewBox="0 0 23 19"
      fill="none"
      className={styles.icons}
    >
      <path
        d="M22.4375 6.17969C22.4375 13.0156 12.3018 18.5488 11.8701 18.7773C11.7563 18.8385 11.6292 18.8706 11.5 18.8706C11.3708 18.8706 11.2436 18.8385 11.1299 18.7773C10.6982 18.5488 0.5625 13.0156 0.5625 6.17969C0.564309 4.57444 1.20279 3.03546 2.33788 1.90038C3.47296 0.765293 5.01194 0.126809 6.61719 0.125C8.63379 0.125 10.3994 0.992187 11.5 2.45801C12.6006 0.992187 14.3662 0.125 16.3828 0.125C17.9881 0.126809 19.527 0.765293 20.6621 1.90038C21.7972 3.03546 22.4357 4.57444 22.4375 6.17969Z"
        fill="#F6F6F6"
      />
    </svg>
  );
}
