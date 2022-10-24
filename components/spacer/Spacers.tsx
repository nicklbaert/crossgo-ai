import PropTypes from "prop-types";

export { Spacer };

const vertical = 'vertical';
const horizontal = 'horizontal';

Spacer.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

Spacer.defaultProps = {
  type: vertical,
  size: 36,
};

type SpacerArguments = {
  type: string;
  size: number;
};

function isVertical(type:string) : boolean {
    return (type == vertical)
}

function Spacer({
  type,
  size,
  ...props
}: SpacerArguments) {
  return (
    <div className={isVertical(type) ? vertical:horizontal}>
        <style jsx>{`
        .${vertical} {
            display: block;
          height: ${size}px;
        }
        .${horizontal} {
            display: block;
            width: ${size}px;
        }
      `}</style>
    </div>
    
  );
}
