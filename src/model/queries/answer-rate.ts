export function AnswerRateQuery(tag: string) {
  return `
  	SELECT 
      T.month,
      (T.question_count - T.unanswered_count) 
        / CAST(T.question_count AS DECIMAL) 
      AS answer_rate
    FROM
      (
        SELECT 
          to_char(creation_date, 'YYYY-MM-01') AS "month",
          SUM(
            CAST (
              CASE 
                WHEN is_answered = true
                  THEN 1 
                  ELSE 0 
                END AS INT
            )
          ) AS "unanswered_count",
          COUNT(*) AS "question_count"
        FROM 
          public."Question" q
        WHERE 
          q.tag = '${tag}'
        GROUP BY 
          month
      ) T
    ORDER BY T.month ASC;
  `
}
