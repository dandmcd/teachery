import bcrypt from "bcrypt";

const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "A user must have a username."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "A user must provide an email address."
        },
        isEmail: {
          args: true,
          msg: "Not a valid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [7, 142],
          msg: "Password must be at least 7 characters"
        }
      }
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "A user must have a role"
        }
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
    User.hasMany(models.AssignedTask);
    User.hasMany(models.Assignment, { as: "userId", onDelete: "CASCADE" });
    User.hasMany(models.Deck);
    User.belongsToMany(models.Deck, {
      as: "UserBookmark",
      through: models.BookmarkedDeck,
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }
    return user;
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
export default user;
