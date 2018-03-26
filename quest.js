const quest = {
  text: "Hoeveel bestanden wil je behouden",
  attachments: [
    {
      text: "wat wil je behouden",
      fallback: "",
      callback_id: "wopr_game",
      color: "#FF2222",
      attachment_type: "default",
      actions: [
        {
          name: "behouden",
          text: "een week",
          type: "button",
          value: "1_week"
        },
        {
          name: "behouden",
          text: "twee weken",
          type: "button",
          value: "twee_weken"
        },
        {
          name: "behouden",
          text: "wis alles",
          style: "danger",
          type: "button",
          value: "wis_alles",
          confirm: {
            title: "Damn",
            text: "weet je zeker dat je alles wilt wissen?",
            ok_text: "Ja",
            dismiss_text: "Nee"
          }
        }
      ]
    }
  ]
};
module.exports = {
  delete: quest
};
