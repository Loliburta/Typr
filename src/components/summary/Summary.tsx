interface Props {
  wpm: number;
  acc: number;
  time: number;
}
export const Summary: React.FC<Props> = ({ wpm, acc, time }) => {
  return (
    <div className="summary">
      <div className="summary__data">
        <div className="summary__data__item">
          wpm{" "}
          <span className="summary__data__item__value">{wpm.toFixed(1)}</span>
        </div>
        <div className="summary__data__item">
          acc <span className="summary__data__item__value">{acc}%</span>
        </div>
        <div className="summary__data__item">
          time <span className="summary__data__item__value">{time}s</span>
        </div>
      </div>
    </div>
  );
};
