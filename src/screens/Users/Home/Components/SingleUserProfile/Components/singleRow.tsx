interface singleRowProps {
  keyName: string;
  keyValue: string;
}
export default function SingleRow({ keyName, keyValue }: singleRowProps) {
  return (
    <span className="single-row-wrap">
      <p className="singleRow-key">{keyName}</p>
      <p className="singleRow-value"> : {keyValue}</p>
    </span>
  );
}
