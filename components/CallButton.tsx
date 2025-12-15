"use client";
import { trackEvent } from '../lib/gtag';
import { PRIMARY_PHONE_HREF } from '../lib/constants/phone';
import React from "react";

type CallButtonProps = React.ComponentProps<'a'> & {
  label: string;
};

const CallButton = React.forwardRef<HTMLAnchorElement, CallButtonProps>(
  ({ label, onClick, href = PRIMARY_PHONE_HREF, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      trackEvent({ action: 'call_click', category: 'engagement', label });
      if (onClick) onClick(e);
    };

    return (
      <a
        href={href}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

CallButton.displayName = "CallButton";
export default CallButton; 