import React from 'react';

const Avatar = ({ name, size = 50, textColor = '#fff', border = '2px solid #fff' }) => {
  // Split the name into an array of words and get the first letter of the first and last name
  const nameParts = name.split(" ");
  const initials = nameParts[0][0] + (nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '');

  const avatarStyle = {
    width: size,
    height: size,
    backgroundColor: '#333323',
    color: textColor,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size / 3,  // Font size relative to the size of the avatar
    fontWeight: 500,
    border: border,
    letterSpacing: "1px",
  };

  return (
    <div style={avatarStyle} title={name}>
      {initials}
    </div>
  );
};

export default Avatar;
