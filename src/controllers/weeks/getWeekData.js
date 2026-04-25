export const getWeekData = (req, res) => {
  const { weekNumber } = req.params;

  const weekNumberNum = Number(weekNumber);

  // валідація
  if (isNaN(weekNumberNum) || weekNumberNum < 1 || weekNumberNum > 40) {
    return res.status(400).json({ message: "Invalid week number" });
  }

  // розрахунок днів
  const daysToBirth = Math.max(0, 280 - weekNumberNum * 7);

  let weekContent;

  // 1–9
  if (weekNumberNum >= 1 && weekNumberNum <= 9) {
    weekContent = {
      baby: {
        size: "як виноград",
        description: "Малюк тільки починає розвиватися"
      },
      mom: {
        tip: "Більше відпочивайте",
        feelings: ["сонливість", "втома"]
      }
    };
  }

  // 10–16
  else if (weekNumberNum >= 10 && weekNumberNum <= 16) {
    weekContent = {
      baby: {
        size: "як авокадо",
        description: "Малюк активно росте і розвивається"
      },
      mom: {
        tip: "Слідкуйте за харчуванням",
        feelings: ["нудота", "емоційність"]
      }
    };
  }
  // 17-19 тиждень
  else if (weekNumberNum >= 17 && weekNumberNum <= 19) {
  weekContent = {
    baby: {
      size: "як апельсин",
      description: "Малюк активно росте і стає сильнішим"
    },
    mom: {
      tip: "Слідкуйте за своїм самопочуттям",
      feelings: ["втома", "підвищений апетит"]
    }
  };
}

  // 20–25
  else if (weekNumberNum >= 20 && weekNumberNum <= 25) {
    weekContent = {
      baby: {
        size: "як банан",
        description: "Малюк активно рухається"
      },
      mom: {
        tip: "Пийте більше води",
        feelings: ["втома", "відчуття рухів малюка"]
      }
    };
  }
// 26-29
  else if (weekNumberNum >= 26 && weekNumberNum <= 29) {
  weekContent = {
    baby: {
      size: "як кокос",
      description: "Малюк продовжує активно рости"
    },
    mom: {
      tip: "Слідкуйте за навантаженням",
      feelings: ["втома", "важкість"]
    }
  };
}
  // 30–39
  else if (weekNumberNum >= 30 && weekNumberNum <= 39) {
    weekContent = {
      baby: {
        size: "як диня",
        description: "Малюк швидко набирає вагу"
      },
      mom: {
        tip: "Більше відпочивайте",
        feelings: ["важкість", "набряки"]
      }
    };
  }

  // 40+
  else if (weekNumberNum >= 40) {
    weekContent = {
      baby: {
        size: "як кавун",
        description: "Малюк готовий до народження"
      },
      mom: {
        tip: "Будьте готові до пологів",
        feelings: ["хвилювання", "очікування"]
      }
    };
  }

  // fallback
  else {
    weekContent = {
      baby: {
        size: "як фрукт",
        description: "Малюк розвивається"
      },
      mom: {
        tip: "Дбайте про себе",
        feelings: ["різні відчуття"]
      }
    };
  }

  const data = {
    week: weekNumberNum,
    daysToBirth,
    ...weekContent
  };

  res.json(data);
};