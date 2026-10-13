import { LoaderCircle } from "lucide-react";
import "./Button.css";
import { useId } from "react";

export default function Button({
    children,
    icon: Icon,
    variant = "primary",
    size = "md",
    loading = false,
    className,
    type = "button",
    tooltip = "",
    tooltipPosition = "top",
    width = "auto",
    disabled,
    ...props
}) {

    const classes = [
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    const tooltipClass = "tooltip tooltip-" + tooltipPosition;

    const tooltipId = useId();

    const button = (
        <button
            {...props}
            type={type}
            disabled={disabled || loading}
            aria-busy={loading}
            className={classes}
            title={tooltip}
            style={{ width }}
        >
            {loading ? (
                <LoaderCircle className="btn-spinner" />
            ) : (
                Icon && <Icon className="btn-icon" />
            )}

            {children}
        </button>
    )

    return (
        tooltip ? (
            <span className="tooltip-wrapper">
                {button}

                <span
                  id={tooltipId}
                  role="tooltip"  
                  className={tooltipClass}    
                >
                    {tooltip}
                </span>
            </span>
        ) : (
            button
        )
    );
}