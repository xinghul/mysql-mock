import org.apache.spark.rdd.JdbcRDD
import java.sql.{Connection, DriverManager, ResultSet}

val url="jdbc:mysql://localhost:3306/test"
val username="root"
val password="Lxh_6589775"

Class.forName("com.mysql.jdbc.Driver").newInstance
val headerRDD = new JdbcRDD(sc, () => DriverManager.getConnection(url,username,password) ,
                        "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='test' AND `TABLE_NAME`='testTable' LIMIT ?, ?", 
                        0, 10, 1,
                        r => r.getString("COLUMN_NAME"))
val headerArray = headerRDD.toArray()
val rowRDD = new JdbcRDD(sc, () => DriverManager.getConnection(url,username,password) ,
                        "select * from testTable limit ?, ?",
                        0, 1000, 1, 
                        r => {
                            var ret = ""
                            var i = 0
                            for (i <- 0 until headerArray.length) {
                                ret ++= r.getString(headerArray(i))
                                if (i < headerArray.length - 1) {
                                    ret ++= ","
                                }
                            }
                            ret
                        }) 
var ret = ""
var i = 0
for (i <- 0 until headerArray.length) {
    ret ++= headerArray(i)
    if (i < headerArray.length - 1) {
        ret ++= ","
    }
}
ret ++= "\n"

rowRDD.collect().foreach(line => {
    ret ++= line
    ret ++= "\n"
})

scala.tools.nsc.io.File("/Users/levilu/Downloads/result.csv").writeAll(ret)



